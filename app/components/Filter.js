import moment from "moment";
import "./Filter.css";
import calendar from "../../images/calendar.png";
import filterLogo from "../../images/filterLogo.png";
import { useEffect, useState } from "react";

const Filter = (props) => {
  const [filter, setFilter] = useState("All Launches");
  const [dateFilter, setDateFilter] = useState("All Dates");
  const { launchData, setLaunchData } = props;
  useEffect(() => {
    filterLaunches();
  }, [filter, dateFilter]);

  //   useEffect(() => {
  //     filterByDate();
  //   }, [dateFilter]);

  const filterLaunches = () => {
    let launchDataCopy = [...launchData];
    switch (filter) {
      case "Upcoming Launches":
        launchDataCopy = launchDataCopy.filter((item) => item.upcoming);
        break;
      case "Successful Launches":
        launchDataCopy = launchDataCopy.filter((item) => item.launch_success);
        break;
      case "Failed Launches":
        launchDataCopy = launchDataCopy.filter(
          (item) => item.launch_success === false && item.upcoming === false
        );
        break;
      default:
        launchDataCopy;
    }

    const now = moment();
    let startDate;
    let filteredLaunches;

    const filterFunction = () => {
      filteredLaunches = launchDataCopy.filter((item) =>
        moment(item.launch_date_utc).isBetween(startDate, now)
      );
    };

    switch (dateFilter) {
      case "Last 5 years":
        startDate = now.clone().subtract(5, "years");
        filterFunction();
        break;
      case "Last 8 years":
        startDate = now.clone().subtract(8, "years");
        filterFunction();
        break;
      case "Last 10 years":
        startDate = now.clone().subtract(10, "years");
        filterFunction();
        break;
      case "Last 12 years":
        startDate = now.clone().subtract(12, "years");
        filterFunction();
        break;
      case "Last 15 years":
        startDate = now.clone().subtract(15, "years");
        filterFunction();
        break;
      case "All Dates":
        filteredLaunches = launchDataCopy;
    }

    setLaunchData(filteredLaunches);
  };
  const handleFilterChange = (event) => {
    console.log(event);
    setFilter(event.target.value);
  };
  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
  };

  return (
    <div className="filterContainer">
      <div className="yearFilter">
        <img className="calendarLogo" src={calendar} alt="calendar"></img>
        <select
          className="years"
          id="dateFilter"
          value={dateFilter}
          onChange={handleDateFilterChange}
        >
          <option>All Dates</option>
          <option>Last 5 years</option>
          <option>Last 8 years</option>
          <option>Last 10 years</option>
          <option>Last 12 years</option>
          <option>Last 15 years</option>
        </select>
      </div>

      <div className="launchFilter">
        <img className="filterLogo" src={filterLogo} alt="filter"></img>
        <select
          className="launches"
          id="filter"
          value={filter}
          onChange={handleFilterChange}
        >
          <option>All Launches</option>
          <option>Upcoming Launches</option>
          <option>Successful Launches</option>
          <option>Failed Launches</option>
        </select>
      </div>
    </div>
  );
};
export default Filter;
