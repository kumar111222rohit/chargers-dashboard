'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from './components/Button/Button';
import './globals.css';
import { Header } from './components/Header/Header';

export default function Home() {
  return (
    <>
      <Header
        imgSrc="/static/assets/fastned-logo.svg"
        tooltipText="Welcome to Fastned"
      />
      <Link href="/chargers">
        <div className="home-page-btn">
          <Button btnLabel="Click to view assignment" />
        </div>
      </Link>
    </>
  );
}
