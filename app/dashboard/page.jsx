import NavBar from "@/app/ui/nav-bar";
import Card from "@/app/ui/dashboard/cards";
import Table from "@/app/ui/dashboard/table";
import Footer from "@/app/ui/footer";
import Button from "../ui/button";
import { versionCheck } from "../lib/utils";
import { updateCMS } from "../lib/actions";
// import { auth } from "@/auth";

export default async function Dashboard() {
  // const session = await auth();

  const overview = [
    {
      name: "Articles",
      count: 45,
      growth: "decrease",
      growthPercentage: "19%",
      status: "Upto Date",
    },
    {
      name: "Pages",
      count: 15,
      growth: "increase",
      growthPercentage: "19%",
      status: "Till Date",
    },
    {
      name: "Success Stories",
      count: 0o6,
      growth: "increase",
      growthPercentage: "19%",
      status: "Till Date",
    },
    {
      name: "Leads",
      count: 10,
      growth: "increase",
      growthPercentage: "19%",
      status: "Till Date",
    },
    {
      name: "Reviews",
      count: 20,
      growth: "increase",
      growthPercentage: "19%",
      status: "Till Date",
    },
    {
      name: "Contacts",
      count: 0o4,
      growth: "increase",
      growthPercentage: "19%",
      status: "Till Date",
    },
  ];

  const version = await versionCheck();

  return (
    <div className="flex flex-col h-full">
      <NavBar page="Dashboard" />
      <main className="pl-10 pr-10 pt-5">
        {version && (
          <div className="flex justify-between items-center custom-border bg-white p-3 mb-5">
            <p>New Update Available</p>
            <form action={updateCMS}>
              <Button name="Update Now" />
            </form>
          </div>
        )}
        <div className="mb-10">
          <h2 className="text-15-grey mb-5">Overview</h2>
          <div className="grid grid-cols-6 gap-x-7">
            {overview.map((data) => {
              return (
                <Card
                  key={data.name}
                  name={data.name}
                  count={data.count}
                  growth={data.growth}
                  growthPercentage={data.growthPercentage}
                  status={data.status}
                />
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="text-15-grey mb-5">Activities</h2>
          <Table />
        </div>
      </main>
      <Footer />
    </div>
  );
}
