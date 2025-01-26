import Lottie from "lottie-react";
import HelloTrainer from "../../assets/lottie/HelloTrainer.json"
import SectionTitle from "../SectionTitle/SectionTitle";


const TrainerHome = () => {
  return (
    <div>
      <div className="mt-4">
        <SectionTitle
          title={"Manage Clients and Classes Effectively in One Place"}
          subtitle={
            "Track progress, update schedules, and streamline your workflow seamlessly."
          }
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-sm lg:w-64">
          <Lottie animationData={HelloTrainer} />
        </div>
      </div>
    </div>
  );
};

export default TrainerHome;
