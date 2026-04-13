import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? siteConfig.name;
  const kind = searchParams.get('kind') ?? 'page';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#1a1814',
          color: '#f2efe8',
          fontFamily: 'sans-serif'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 80,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: '-0.02em'
          }}
        >
          nvoke
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: title.length > 40 ? 56 : 72,
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            maxWidth: '85%'
          }}
        >
          {title}
        </div>

        {kind === 'post' && (
          <div
            style={{
              position: 'absolute',
              bottom: 60,
              left: 80,
              fontSize: 22,
              color: '#a8a296'
            }}
          >
            nvoke blog
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
