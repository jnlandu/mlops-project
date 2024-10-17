


// pages/api/feedback.js
const PHOENIX_API_ENDPOINT = process.env.PHOENIX_API_ENDPOINT || 'http://localhost:6006';
const SPAN_ANNOTATIONS_ENDPOINT = `${PHOENIX_API_ENDPOINT}/v1/span_annotations`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { spanId, feedbackScore } = req.body;

  try {
    const response = await fetch(SPAN_ANNOTATIONS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        data: [
          {
            span_id: spanId,
            annotator_kind: 'HUMAN',
            name: 'feedback',
            result: {
              label: feedbackScore === 0 ? '👎' : '👍',
              score: feedbackScore,
              explanation: feedbackScore === 0 ? 'Negative feedback from user' : 'Positive feedback from user',
            },
          },
        ],
      }),
    });

    if (response.status !== 200) {
      throw new Error('Failed to send feedback');
    }

    res.status(200).end();
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to send feedback' });
  }
}
