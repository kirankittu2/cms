import Image from "next/image";
import menudots from "@/public/menu-dots.svg";

export default function Table() {
  const activities = [
    {
      id: "1",
      title: "SEO Tips For Begineers",
      type: "Blog Post",
      date: "2023-10-25, 10:00 AM",
      author: "John",
    },

    {
      id: "2",
      title: "SEO Tips For Begineers",
      type: "Blog Post",
      date: "2023-10-25, 10:00 AM",
      author: "John",
    },
    {
      id: "3",
      title: "SEO Tips For Begineers",
      type: "Blog Post",
      date: "2023-10-25, 10:00 AM",
      author: "John",
    },
    {
      id: "4",
      title: "SEO Tips For Begineers",
      type: "Blog Post",
      date: "2023-10-25, 10:00 AM",
      author: "John",
    },
    {
      id: "5",
      title: "SEO Tips For Begineers",
      type: "Blog Post",
      date: "2023-10-25, 10:00 AM",
      author: "John",
    },
    {
      id: "6",
      title: "SEO Tips For Begineers",
      type: "Blog Post",
      date: "2023-10-25, 10:00 AM",
      author: "John",
    },
  ];

  return (
    <div className="custom-border bg-white">
      <table className="w-full">
        <thead className="border-b text-15-black font-bold">
          <tr>
            <th className="text-left p-5 border-r border-[#EBEBEB]">
              Page Title
            </th>
            <th className="text-left p-5 border-r border-[#EBEBEB]">Type</th>
            <th className="text-left p-5 border-r border-[#EBEBEB]">
              Date & Time
            </th>
            <th className="text-left p-5">Author</th>
            <th className="text-left p-5"></th>
          </tr>
        </thead>
        <tbody className="text-15-black activity-table-body">
          {activities.map((activity) => {
            return (
              <tr key={activity.id}>
                <td className="px-5 p-4 border-r border-[#EBEBEB]">
                  {activity.title}
                </td>
                <td className="px-5 p-4 border-r border-[#EBEBEB]">
                  {activity.type}
                </td>
                <td className="px-5 p-4 border-r border-[#EBEBEB]">
                  {activity.date}
                </td>
                <td className="px-5 p-4">{activity.author}</td>
                <td className="px-5 p-4 ">
                  <Image
                    className="cursor-pointer w-auto h-auto"
                    src={menudots}
                    width={21}
                    height={4}
                    alt="Menu button"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
