export default function AppBar({ title }: { title: string }) {
    return (
        <header className="w-full border-b border-gray-200 pb-4">
            <h1 className="text-3xl font-bold">{title}</h1>
        </header>
    );
}
