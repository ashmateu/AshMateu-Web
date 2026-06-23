export default function middleware(request) {
  const host = request.headers.get('host') || '';
  if (host === 'ashmateu.com' || host === 'www.ashmateu.com') {
    return Response.redirect(new URL('/construccion', request.url), 307);
  }
}

export const config = {
  matcher: ['/((?!construccion|_vercel|favicon\\.svg|api/).*)'],
};
