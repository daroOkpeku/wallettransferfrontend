import { useEffect, useState } from "react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import { HiMiniArrowDownLeft, HiMiniArrowUpRight } from "react-icons/hi2";

import ReactPaginate from "react-paginate";
import { FectchTransactionData } from "../Api";
// HiMiniArrowDownLeft in
// HiMiniArrowUpRight out

export default function Main(props) {
  let { Userdata } = props;
  const [Data, SetData] = useState([]);
  const [pageCount, SetpageCount] = useState(0);
  useEffect(() => {
    const fetchTransaction = async () => {
      // FectchTransactionData
      try {
        let number = 1;
        const response = await FectchTransactionData(number);
        console.log(response);
        if (response?.data) {
          SetData(response.data.data);
          // http://127.0.0.1:8000/api/transaction?page=1
          SetpageCount(response.data.last_page);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    // if (Userdata) {
    fetchTransaction();
    // }
  }, []);

  const handleNext = async (data) => {
    setPage(data.selected + 1);

    try {
      let number = data.selected + 1;
      const response = await FectchTransactionData(number);
      console.log(response);
      if (response.data) {
        SetData(response.data.data);
        // http://127.0.0.1:8000/api/transaction?page=1
        SetpageCount(response.data.last_page);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  return (
    <article className="w-[75%] h-screen ">
      <div className="w-full gap-2 px-4 py-4">
        <section className="overflow-x-scroll w-full bg-white sm:overflow-x-scroll rounded-md sm:w-full sm:bg-white sm:rounded-md md:overflow-x-scroll md:w-[98%] md:rounded-md md:bg-white lg:w-[96%] lg:bg-white lg:rounded-md ">
          <table className="w-full">
            <thead>
              <tr>
                <th className="capitalize text-center text-black font-semibold py-4 text-sm sm:text-sm  md:text-base lg:text-lg">
                  transaction id
                </th>
                <th className="capitalize text-center text-black font-semibold py-4 text-sm sm:text-sm  md:text-base lg:text-lg">
                  sender
                </th>
                <th className="capitalize text-center text-black font-semibold py-4 text-sm sm:text-sm  md:text-base lg:text-lg">
                  receiver
                </th>
                <th className="capitalize text-center text-black font-semibold py-4 text-sm sm:text-sm  md:text-base lg:text-lg">
                  amount
                </th>
                <th className="capitalize text-center text-black font-semibold py-4 text-sm sm:text-sm  md:text-base lg:text-lg">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {Data.length == 0 && (
                <tr>
                  <td className="text-center  font-medium capitalize py-2 border-b text-sm">
                    <p>Loading...</p>
                  </td>
                  <td className="text-center  font-medium capitalize py-2 border-b text-sm">
                    <p>Loading...</p>
                  </td>
                  <td className="text-center  font-medium capitalize py-2 border-b text-sm">
                    <p>Loading...</p>
                  </td>
                  <td className="text-center  font-medium capitalize py-2 border-b text-sm">
                    <p>Loading...</p>
                  </td>
                  <td className="text-center  font-medium capitalize py-2 border-b text-sm">
                    <p>Loading...</p>
                  </td>
                </tr>
              )}

              {Array.isArray(Data) && Data.length > 0
                ? Data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-center  font-medium capitalize py-2 border-b text-sm">
                          {item.transaction_number}
                        </td>
                        <td className="text-center  font-medium capitalize py-2  border-b text-sm">
                          {item?.sender?.lastname +
                            " " +
                            item?.sender?.firstname}
                        </td>
                        <td className="text-center  font-medium capitalize py-2 border-b text-sm">
                          {item?.receiver?.lastname +
                            " " +
                            item?.receiver?.firstname}
                        </td>
                        <td className="text-center  font-medium capitalize py-2  border-b text-sm">
                          {parseInt(item?.amount)}
                        </td>
                        <td className="text-center  justify-center font-medium capitalize py-2 border-b text-sm">
                          {item?.reason == "fundwallet" ? (
                            <span className="flex flex-row items-center space-x-2">
                              <h3>Money in</h3>{" "}
                              <HiMiniArrowDownLeft className="text-green-500" />{" "}
                            </span>
                          ) : (
                            <span className="flex flex-row items-center space-x-2">
                              <h3>Money in</h3>{" "}
                              <HiMiniArrowUpRight className="text-red-500" />{" "}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </section>
        <div
          className={`${
            Array.isArray(Data) && Data.length > 0
              ? ""
              : "h-[40vh] flex flex-col justify-end"
          }`}>
          <ReactPaginate
            className="flex justify-center gap-5 mt-10 pb-5 white-text-links"
            // forcePage={page ===1 ? 0 :page - 1}
            pageCount={pageCount === 0 ? 1 : pageCount}
            previousLabel={<FaLessThan />}
            nextLabel={<FaGreaterThan />}
            nextClassName="bg-blue-500 rounded-[40px] p-3 text-white white-text-links
                  flex justify-center items-center cursor-pointer text-sm next"
            previousClassName="bg-blue-500 rounded-[40px] p-3 text-white
                   flex justify-center items-center cursor-pointer text-sm prev"
            pageClassName="pagination border-[#dee2e6] border rounded-[5px] px-4 py-1 text-primary
                      flex justify-center items-center cursor-pointer text-sm  "
            onPageChange={(data) => {
              handleNext(data);
            }} //which doesn't match the pagination which starts from 1
            activeClassName="bg-blue-500 pagination2 border-b-4 flex justify-center border-primary !text-white"
            // marginPagesDisplayed={width < 600 ? 1: 2}
            // pageRangeDisplayed={width < 600 ? 1: 2}
          />
        </div>
      </div>
    </article>
  );
}
