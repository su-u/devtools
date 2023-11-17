'use client'
import Script from 'next/script'
import { useEffect, FC } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { existsGaId, GA_MEASUREMENT_ID, pageview } from '@/lib/gtag';
import { useRouter } from 'next/router';

const GoogleAnalytics: FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!existsGaId) {
      return
    }
    const url = pathname + searchParams.toString()
    pageview(url)
  }, [pathname, searchParams]);

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events]);

  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id='gtag-init' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

export default GoogleAnalytics