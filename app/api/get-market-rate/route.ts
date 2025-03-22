import { NextResponse } from 'next/server';

type RateKey = 'Patty-Cheese' | 'Cheese-Patty' | 'Patty-Lettuce' | 'Lettuce-Patty' | 'Cheese-Lettuce' | 'Lettuce-Cheese';

const rates: Record<RateKey, number> = {
  'Patty-Cheese': 2.0,
  'Cheese-Patty': 0.5,
  'Patty-Lettuce': 1.5,
  'Lettuce-Patty': 0.666,
  'Cheese-Lettuce': 0.75,
  'Lettuce-Cheese': 1.333
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fromToken = searchParams.get('fromToken') || 'Patty';
  const toToken = searchParams.get('toToken') || 'Cheese';

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const rate = rates[`${fromToken}-${toToken}` as RateKey] || 0;

  return NextResponse.json({
    rate,
    timestamp: new Date().toISOString(),
    fromToken,
    toToken
  });
}
