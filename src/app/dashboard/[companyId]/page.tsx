export default async function DashboardPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">PredictOff Dashboard</h1>
      <p className="text-sm opacity-60 mt-1">
        Company: {companyId}
      </p>
    </div>
  );
}
