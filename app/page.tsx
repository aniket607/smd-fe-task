
import ExperienceEditor from '../components/ExperienceEditor';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <div className="absolute inset-0 bg-grid-gray-900/[0.02] -z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-gray-100/50 backdrop-blur-3xl -z-10" />
      <ExperienceEditor />
    </main>
  );
}
