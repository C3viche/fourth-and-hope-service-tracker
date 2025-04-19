// import styles from "./page.module.scss";
import DemographicsChart from "@/app/(components)/DemographicsChart/DemographicsChart";

const Home = () => {
  return (
    <div>
        <DemographicsChart
            width={300}
            height={400}
            demographic={"age"}
            dataValues={[19, 26, 55, 20]}
        />
        <DemographicsChart
            width={300}
            height={400}
            demographic="sex"
            dataValues={[19, 26, 55]}
        />
    </div>
  );
}

export default Home;
