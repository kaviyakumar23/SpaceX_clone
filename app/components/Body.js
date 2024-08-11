import moment from "moment";
import Modal from "./Modal";
import Spinner from "./Spinner";
import FlowerSpinner from "./FlowerSpinner";
import Filter from "./Filter";
import Chip from "./Chip";
import { useEffect, useState } from "react";
import nasaLogo from "../../images/nasaLogo.png";
import wikiLogo from "../../images/wikipediaLogo.png";
import youtubeLogo from "../../images/youTubeLogo.png";
import "./Body.css";
import Pagination from "./Pagination";

const Body = () => {
  const [launchData, setLaunchData] = useState([]);
  const [allLaunches, setAllLaunches] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eachShowModal, setEachShowModal] = useState(null);
  const [wikiContent, setWikiContent] = useState("");
  const [loadPage, setLoadPage] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setTableLoading(true);
    const data = await fetch("https://api.spacexdata.com/v3/launches");
    const jsonData = await data.json();
    setLaunchData(jsonData);
    setAllLaunches(jsonData);
    setTableLoading(false);
  };

  const showLaunchData = (params) => {
    setLoadPage(true);
    setShowModal(true);
    console.log(params);
    const mission_name = params.mission_name;

    setEachShowModal(params);

    const fetchWikiContent = async () => {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${mission_name}`
      );
      const wikiData = await response.json();
      setLoadPage(false);
      setWikiContent(wikiData.extract);
    };
    fetchWikiContent();
  };
  const onClose = () => {
    setShowModal(false);
  };

  return (
    <div className="dashboard">
      <Filter
        launchData={launchData}
        setLaunchData={setLaunchData}
        allLaunches={allLaunches}
      />
      <div className="tableWrapper">
        <table className="tableDesign">
          <thead className="tableHeader">
            <th className="no">No: </th>
            <th className="launched">Launched (UTC)</th>
            <th className="location">Location</th>
            <th className="mission">Mission</th>
            <th className="orbit">Orbit</th>
            <th className="launchStatus">Launch Status</th>
            <th className="rocket">Rocket</th>
          </thead>

          {tableLoading ? (
            <tr>
              <td colSpan={7} align="center">
                <FlowerSpinner />
              </td>
            </tr>
          ) : (
            <tbody className="tableBody">
              {launchData.length === 0 ? (
                <td colSpan={7} align="center">
                  No results found for the specified filter
                </td>
              ) : (
                currentPageData.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => {
                        showLaunchData(item);
                      }}
                    >
                      <td>{item?.flight_number}</td>
                      <td>
                        {moment(item?.launch_date_utc).format(
                          "DD MMMM YYYY [at] HH:mm"
                        )}
                      </td>
                      <td>{item?.launch_site.site_name}</td>
                      <td>{item?.mission_name}</td>
                      <td>{item?.rocket?.second_stage?.payloads[0]?.orbit}</td>
                      <td>
                        <Chip
                          upcoming={item.upcoming}
                          success={item.launch_success}
                        />
                      </td>
                      <td>{item.rocket.rocket_name}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          )}
        </table>
      </div>
      <Pagination
        limit={10}
        data={launchData}
        setCurrentPageData={setCurrentPageData}
      />
      <Modal show={showModal} onClose={onClose}>
        <div className="modalContent">
          <div className="gridStart">
            <img src={eachShowModal?.links?.mission_patch_small} />
          </div>
          <div className="gridMiddle">
            <p className="missionName">{eachShowModal?.mission_name}</p>

            <p className="rocketName">{eachShowModal?.rocket?.rocket_name}</p>
            <div className="logoContainer">
              <a href={eachShowModal?.links?.article_link} target="_blank">
                <img className="logoLink" src={nasaLogo} alt="nasalogo"></img>
              </a>
              <a href={eachShowModal?.links?.wikipedia} target="_blank">
                <img className="logoLink" src={wikiLogo} alt="wikilogo"></img>
              </a>
              <a href={eachShowModal?.links?.video_link} target="_blank">
                <img
                  className="logoLink"
                  src={youtubeLogo}
                  alt="youTubelogo"
                ></img>
              </a>
              <div />
            </div>
          </div>
          <div className="gridEnd">
            <p>
              <Chip
                upcoming={eachShowModal?.upcoming}
                success={eachShowModal?.launch_success}
              />
            </p>
          </div>
        </div>
        <div className="wikiContent">
          {loadPage ? <Spinner /> : <p>{wikiContent}</p>}
        </div>
        <table className="missionDetails">
          <tbody>
            <tr>
              <td>Flight Number</td>
              <td>{eachShowModal?.flight_number}</td>
            </tr>
            <tr>
              <td>Mission Name</td>
              <td>{eachShowModal?.mission_name}</td>
            </tr>
            <tr>
              <td>Rocket Type</td>
              <td>{eachShowModal?.rocket?.rocket_type}</td>
            </tr>
            <tr>
              <td>Rocket Name</td>
              <td>{eachShowModal?.rocket?.rocket_name}</td>
            </tr>
            <tr>
              <td>Manufacturer</td>
              <td>
                {eachShowModal?.rocket?.second_stage?.payloads[0]?.manufacturer}
              </td>
            </tr>
            <tr>
              <td>Nationality</td>
              <td>
                {eachShowModal?.rocket?.second_stage?.payloads[0]?.nationality}
              </td>
            </tr>
            <tr>
              <td>Launch Date</td>
              <td>{eachShowModal?.launch_date_utc}</td>
            </tr>
            <tr>
              <td>Payload Type</td>
              <td>
                {eachShowModal?.rocket?.second_stage?.payloads[0]?.payload_type}
              </td>
            </tr>
            <tr>
              <td>Orbit</td>
              <td>{eachShowModal?.rocket?.second_stage?.payloads[0]?.orbit}</td>
            </tr>
            <tr>
              <td>Launch Site</td>
              <td>{eachShowModal?.launch_site?.site_name}</td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </div>
  );
};

export default Body;
