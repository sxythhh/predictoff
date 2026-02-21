export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ experienceId: string }>;
}) {
  const { experienceId } = await params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">PredictOff</h1>
      <p className="text-sm opacity-60 mt-1">
        Experience: {experienceId}
      </p>
    </div>
  );
}
