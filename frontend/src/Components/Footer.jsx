import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <section className="relative overflow-hidden py-10 bg-blue-600 border-t-2 border-black">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="flex flex-wrap justify-between">
                    
                    {/* Contact Section */}
                    {/* <div className="w-full md:w-1/2 lg:w-2/12 mb-6 md:mb-0">
                        <div className="h-full">
                            <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-500">
                                Contact
                            </h3>
                            <ul>
                                <li className="mb-2 text-gray-700 font-bold">
                                    XXXX-XXXX-YY
                                </li>
                                <li className="mb-2 text-gray-700 font-bold">
                                    iits@gmail.com
                                </li>
                            </ul>
                        </div>
                    </div> */}

                    {/* Visit Us Section */}
                    {/* <div className="w-full md:w-1/2 lg:w-2/12 mb-6 md:mb-0">
                        <div className="h-full">
                            <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-500">
                                Visit Us
                            </h3>
                            <div className="flex flex-col items-center rounded-lg p-2">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d343.3070212046307!2d85.7215792!3d25.2000239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f25d1af98fdf1d%3A0xeebf37a184b6640!2sKhetalpura%20Dairy!5e0!3m2!1sen!2sin!4v1721372213080!5m2!1sen!2sin"
                                    width="100%"
                                    height="200"
                                    style={{ border: 0, padding: "10px", borderRadius: "10px" }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div> */}

                    {/* Logo and Copyright Section */}
                    <div className="w-full lg:w-5/12 mb-6 md:mb-0 flex flex-col items-center">
                        <div className="mb-6">
                            <Link to="/" className="block">
                                <img
                                    src="https://i.pinimg.com/474x/f6/81/c7/f681c776279f3f2a0d775eba95efc9c9.jpg"
                                    alt="logo"
                                    className="w-30 h-20 object-contain rounded-full"
                                />
                            </Link>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 text-center">
                                &copy; Copyright 2024. All Rights Reserved by KHETALPURA DAIRY
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;
