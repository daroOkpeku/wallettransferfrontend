import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";

function Notice({ Message, SetMessage }) {
  return (
    <div
      className={
        Message.is_open
          ? "w-full h-full fixed top-0 left-0  z-50 bg-black bg-opacity-50 flex items-center justify-center"
          : "hidden"
      }>
      <section className="bg-white rounded-md w-10/12 sm:w-3/5 md:w-1/2 lg:w-2/5 mt-10 flex flex-col items-center gap-4 py-4">
        <div className="w-full flex flex-row items-center justify-center mt-2">
          {Message && Message.status == "success" ? (
            <span className="w-24 h-24">
              <FaCircleCheck className="w-full h-full text-green-400" />
            </span>
          ) : (
            <span className="w-24 h-24">
              <IoMdCloseCircle className="w-full h-full text-red-400" />
            </span>
          )}
        </div>
        <article className="w-full flex flex-col items-center justify-center gap-3">
          <span className="w-3/4 text-center text-sm sm:text-base md:text-2xl lg:text-2xl font-semibold capitalize">
            {Message && Message.message}
          </span>

          <button
            onClick={() => SetMessage({ ...Message, is_open: false })}
            className="bg-blue-400 text-white w-1/3 m-auto rounded-md py-3 capitalize">
            close
          </button>
        </article>
      </section>
    </div>
  );
}

export default Notice;
