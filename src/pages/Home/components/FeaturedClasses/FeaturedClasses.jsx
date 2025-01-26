import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import ClassCard from "../../../../components/ClassCard/ClassCard";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";

const FeaturedClasses = () => {
  const axiosPublic = useAxiosPublic();
  const { data: classes = [] } = useQuery({
    queryKey: ["featured-classes"],
    queryFn: async () => {
      const res = await axiosPublic.get("/featured-classes");
      return res.data;
    },
  });




  return (
    <div className="my-8">
     <SectionTitle title={"Explore Our Top Featured Classes"} subtitle={""} />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((classItem, index) => (
          <ClassCard key={classItem._id || index} item={classItem} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedClasses;
