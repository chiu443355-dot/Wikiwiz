export interface FearGreedData {
  value: number;
  valueText: string;
  classification: string;
  timestamp: number;
}

export async function fetchFearGreedIndex(): Promise<FearGreedData> {
  try {
    const response = await fetch(
      'https://fear-and-greed-index.p.rapidapi.com/v1/fgi',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
          'x-rapidapi-host': 'fear-and-greed-index.p.rapidapi.com'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Fear & Greed Index');
    }

    const data = await response.json();
    
    return {
      value: data.fgi?.value || 50,
      valueText: data.fgi?.valueText || 'Neutral',
      classification: getClassification(data.fgi?.value || 50),
      timestamp: Date.now()
    };
  } catch (error) {
    console.error('Fear & Greed API error:', error);
    // Return neutral value on error
    return {
      value: 50,
      valueText: 'Neutral',
      classification: 'Neutral - Unable to fetch live data',
      timestamp: Date.now()
    };
  }
}

function getClassification(value: number): string {
  if (value <= 25) return 'Extreme Fear - Markets heavily oversold';
  if (value <= 45) return 'Fear - Sellers control sentiment';
  if (value <= 55) return 'Neutral - Balanced market conditions';
  if (value <= 75) return 'Greed - Buyers pushing prices higher';
  return 'Extreme Greed - Markets heavily overbought';
}

export function getEmotionalContext(value: number): {
  emotion: string;
  color: string;
  bgColor: string;
  advice: string;
} {
  if (value <= 25) {
    return {
      emotion: 'Extreme Fear',
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950',
      advice: 'Historically, extreme fear creates buying opportunities. Consider dollar-cost averaging into quality assets.'
    };
  }
  if (value <= 45) {
    return {
      emotion: 'Fear',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
      advice: 'Downside pressure is present. Focus on defensive positions and capital preservation.'
    };
  }
  if (value <= 55) {
    return {
      emotion: 'Neutral',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      advice: 'Markets are balanced. This is ideal for systematic position building.'
    };
  }
  if (value <= 75) {
    return {
      emotion: 'Greed',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
      advice: 'Bullish momentum is strong. Be cautious about FOMO and maintain risk discipline.'
    };
  }
  return {
    emotion: 'Extreme Greed',
    color: 'text-green-700',
    bgColor: 'bg-green-100 dark:bg-green-900',
    advice: 'Euphoria is high. Consider taking profits on winners and maintaining cash for opportunities.'
  };
}
