'use client';

import { useState, useRef, useEffect } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { Rnd } from 'react-rnd';

// Global z-index counter
let globalZIndex = 10;

// Minimum window dimensions
const MIN_WIDTH = 400;
const MIN_HEIGHT = 300;

interface DraggableWindowProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  className?: string;
}

export default function DraggableWindow({
  title,
  onClose,
  children,
  initialPosition = { x: 0, y: 0 },
  initialSize = { width: 400, height: 300 },
  className = '',
}: DraggableWindowProps) {
  const [isInteracting, setIsInteracting] = useState(false);
  const [zIndex, setZIndex] = useState(globalZIndex);
  const [isMobile, setIsMobile] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Focus the window when it mounts for better keyboard accessibility
  useEffect(() => {
    windowRef.current?.focus();
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const bringToFront = () => {
    globalZIndex += 1;
    setZIndex(globalZIndex);
  };

  useEffect(() => {
    bringToFront();
  }, []);

  useEffect(() => {
    if (isInteracting) {
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.body.style.userSelect = '';
    };
  }, [isInteracting]);

  const windowChrome = (
    <div
      ref={windowRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="window-title"
      tabIndex={0}
      className="h-full outline-none"
      onKeyDown={handleKeyDown}
    >
      <div className="window-header bg-gray-800 h-6 flex items-center space-x-2 px-4 rounded-t-xl sticky top-0 left-0 right-0 z-10">
        <button
          onClick={onClose}
          aria-label={`Close ${title}`}
          title="Close"
          className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
        />
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span id="window-title" className="text-sm text-gray-300 flex-grow text-center font-semibold">
          {title}
        </span>
      </div>
      <div className="relative h-[calc(100%-1.5rem)]">
        {children}
      </div>
    </div>
  );

  const windowClassName = `bg-[#1d1d1f] shadow-xl overflow-hidden p-0 transition-all duration-300 ${
    isInteracting ? 'cursor-grabbing' : 'cursor-default'
  } ${className}`;

  if (isMobile) {
    return (
      <div
        className={`fixed inset-0 m-4 rounded-xl ${windowClassName}`}
        style={{
          zIndex,
          transition: isInteracting ? 'none' : 'all 0.2s ease-out',
        }}
        onMouseDown={bringToFront}
      >
        {windowChrome}
      </div>
    );
  }

  return (
    <Rnd
      default={{
        x: initialPosition.x,
        y: initialPosition.y,
        width: initialSize.width,
        height: initialSize.height,
      }}
      minWidth={MIN_WIDTH}
      minHeight={MIN_HEIGHT}
      dragHandleClassName="window-header"
      enableResizing={{
        bottom: true,
        bottomLeft: true,
        bottomRight: true,
        left: true,
        right: true,
        top: false,
        topLeft: false,
        topRight: false,
      }}
      onMouseDown={bringToFront}
      onDragStart={() => {
        bringToFront();
        setIsInteracting(true);
      }}
      onDragStop={() => setIsInteracting(false)}
      onResizeStart={() => {
        bringToFront();
        setIsInteracting(true);
      }}
      onResizeStop={() => setIsInteracting(false)}
      className={`absolute rounded-xl ${windowClassName}`}
      style={{
        zIndex,
        transition: isInteracting ? 'none' : 'all 0.2s ease-out',
      }}
    >
      {windowChrome}
    </Rnd>
  );
} 
