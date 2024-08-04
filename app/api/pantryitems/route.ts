import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Handle GET requests
  return NextResponse.json({ message: 'GET request handled' });
}

export async function POST(request: Request) {
  // Handle POST requests
  return NextResponse.json({ message: 'POST request handled' });
}

// Add other HTTP methods as needed (PUT, DELETE, etc.)