import React from "react";
import Countdown from "react-countdown";

const Countdowns = ({ expiration }) => {
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <div>
          <h2 className="text-white text-center animate-bounce">
            Ticket sales are currently CLOSED
          </h2>
          <div>
            <div className="flex space-x-3">
              <div className="flex-1">
                <div className="countdown animate-pulse">{hours}</div>
                <div className="countdown-label">hours</div>
              </div>

              <div className="flex-1">
                <div className="countdown animate-pulse">{minutes}</div>
                <div className="countdown-label">minutes</div>
              </div>

              <div className="flex-1">
                <div className="countdown animate-pulse">{seconds}</div>
                <div className="countdown-label">seconds</div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="text-white text-center text-xl animate-bounce">
            Time Remaining
          </div>
          <div className="flex space-x-6">
            <div className="flex-1">
              <div className="countdown py-4">{hours}</div>
              <div className="countdown-label">hours</div>
            </div>

            <div className="flex-1">
              <div className="countdown py-4">{minutes}</div>
              <div className="countdown-label">minutes</div>
            </div>

            <div className="flex-1">
              <div className="countdown py-4">{seconds}</div>
              <div className="countdown-label">seconds</div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <Countdown date={new Date(expiration)} renderer={renderer} />
    </div>
  );
};

export default Countdowns;
