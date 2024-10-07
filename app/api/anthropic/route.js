import { NextResponse } from 'next/server';




export async function POST(request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;


  console.log('Starting POST request to Anthropic API');


  const { prompt } = await request.json();
 const requestBody = {
    model: "claude-2.1",
    max_tokens_to_sample: 1024,
    prompt: `\n\nHuman: Explain this like I'm five: ${prompt}\n\nAssistant:`,
  };


  console.log('Request Body:', JSON.stringify(requestBody));

  try {

    const response = await fetch('https://api.anthropic.com/v1/complete', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Response Status:', response.status);
    
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error('Error response:', errorMessage);
      return NextResponse.json({ error:` HTTP error! Status: ${response.status}, Message: ${errorMessage}` });
    }

    const data = await response.json();

 
    return NextResponse.json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ error: 'An error occurred while fetching the response from Anthropic API.' });
  }
}
