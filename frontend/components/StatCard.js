'use client';
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

const StatCard = ({ count, label, icon, type, handleClick,arialControls, state}) => {
    return (
    <>
        <Link  href=''
            className= {clsx("d-flex  px-4 w-75  mw-100 py-2 align-items-center border-none rounded  mt-3", {
                "bg-appointments": type === "appointments",
                "bg-pending": type === "pending",
                "bg-cancelled": type === "cancelled",
            })}
            onClick={handleClick}
            arial-controls = {arialControls}
            aria-expanded={state}
         
        >
            <div className="d-flex">
                <div className="container d-flex align-items-center gap-2 ">
                <Link href="">
                <Image
                    src={icon}
                    height={32}
                    width={32}
                    alt={label}
                    className="size-8 object-fit-contain"
                />
                </Link>
                <h2 className="text-32-bold text-white">{count}</h2>
                </div>
            </div>
            <h5 className="pt-1">{label}</h5> 
        </Link>

    </>
    );
};


// PropType validation
StatCard.propTypes = {
    type: PropTypes.string,
    count: PropTypes.number,
    label: PropTypes.string,
    icon: PropTypes.string,
    handleClick: PropTypes.func,
    // hyperLink: PropTypes.string,
    arialControls: PropTypes.string,


  };
  
  // Default props
  StatCard.defaultProps = {
    type: "appointments",
    count: 0,
    label: "Appointments",
    icon: "/assets/appointments.svg",
  };
  

export default StatCard;
