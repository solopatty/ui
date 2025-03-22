import { NextResponse } from 'next/server';

type RateKey = 'Patty-Cheese' | 'Cheese-Patty';
type Rates = Record<RateKey, number>;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fromToken = searchParams.get('fromToken') || 'Patty';
  const toToken = searchParams.get('toToken') || 'Cheese';

  // Mock market rates
  const rates: Rates = {
    'Patty-Cheese': 2.0,
    'Cheese-Patty': 0.5
  };

  const rate = rates[`${fromToken}-${toToken}` as RateKey] || 0;

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json({
    rate,
    timestamp: new Date().toISOString(),
    fromToken,
    toToken
  });
}
