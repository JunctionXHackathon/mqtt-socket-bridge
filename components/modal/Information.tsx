"use client";

import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import Battery from "./Battery";
import GPS from "./GPS";
import UAV from "./UAV";

export default function Details() {
  return (
    <Card className="modal">
      <CardBody className="modal_container md:gap-0 gap-4">
        <Battery />
        <GPS />
        <UAV />     
      </CardBody>
      <br />
      <div className="flex justify-end relative bottom-6 right-6">
        <Link href='/' className="btn close">Return</Link>
      </div>
    </Card>
  );
}