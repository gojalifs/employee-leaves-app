import { Button } from '@/components/ui/button';

export default function ErrorPage({ status }: { status: number }) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
    }[status];

    const description = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
    }[status];

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-800">{title}</h1>
            <div className="mb-6 text-lg text-gray-600">{description}</div>
            <Button
                variant={'default'}
                onClick={() => (window.location.href = route('dashboard'))}
            >
                Go to Home
            </Button>
        </div>
    );
}
