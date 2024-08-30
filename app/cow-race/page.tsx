"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CowProps {
  position: number;
  index: number;
}

interface RaceTrackProps {
  cows: number[];
}

interface ControlsProps {
  onStart: () => void;
  onReset: () => void;
  cowCount: number;
  setCowCount: (count: number) => void;
  raceTime: number;
  setRaceTime: (time: number) => void;
}

const Cow: React.FC<CowProps> = ({ position, index }) => {
  const cowSpacing = 10;
  return (
    <div
      style={{
        position: "absolute",
        left: `${position}%`,
        top: `${index * cowSpacing}px`,
        transition: "left 0.1s linear",
      }}
    >
      <Image
        src={require("@/public/running-cow.gif")}
        alt="cow"
        width={50}
        height={50}
        priority={false}
        style={{ width: "50px", height: "50px", objectFit: "contain" }}
      />
    </div>
  );
};

const RaceTrack: React.FC<RaceTrackProps> = ({ cows }) => {
  return (
    <div
      style={{
        position: "relative",
        height: "500px",
        width: "80%",
        margin: "0 auto",
      }}
    >
      <Image
        src={require("@/public/co.jpg")}
        alt="cow glasses"
        fill
        priority={true}
      />
      {cows.map((position, index) => (
        <Cow key={index} position={position} index={index} />
      ))}
    </div>
  );
};

const Controls: React.FC<ControlsProps> = ({
  onStart,
  onReset,
  cowCount,
  setCowCount,
  raceTime,
  setRaceTime,
}) => {
  return (
    <div className="w-4/5 mx-auto mb-5 flex justify-between items-end gap-5">
      <div className="grid w-1/2 max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Số lượng bò</Label>
        <Input
          type="number"
          placeholder="Enter number of cows"
          value={cowCount}
          onChange={(e) => setCowCount(parseInt(e.target.value))}
        />
      </div>
      <div className="grid w-1/2 max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Thời gian</Label>
        <Input
          type="number"
          placeholder="Enter race time in seconds"
          value={raceTime}
          onChange={(e) => setRaceTime(parseInt(e.target.value))}
        />
      </div>
      <Button className="w-1/2" onClick={onStart}>
        Start Race
      </Button>
      <Button className="w-1/2" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
};

const CowRace: React.FC = () => {
  const [cowCount, setCowCount] = useState<number>(0);
  const [positions, setPositions] = useState<number[]>([]);
  const [raceStarted, setRaceStarted] = useState<boolean>(false);
  const [winner, setWinner] = useState<number | null>(null);
  const [raceTime, setRaceTime] = useState<number>(10); // Thời gian đua mặc định là 10 giây

  useEffect(() => {
    if (raceStarted && winner === null) {
      const interval = setInterval(() => {
        setPositions((prevPositions) => {
          return prevPositions.map((pos) => {
            const speed = (100 / raceTime) * 0.1; // Tính tốc độ dựa trên thời gian đua
            const newPosition = pos + speed * (Math.random() + 0.5); // Tạo thêm một chút ngẫu nhiên
            if (newPosition >= 100) {
              clearInterval(interval);
              setRaceStarted(false);
              setWinner(prevPositions.indexOf(pos) + 1);
              return 100;
            }
            return newPosition;
          });
        });
      }, 100);
    }
  }, [raceStarted, winner, raceTime]);

  const startRace = () => {
    setPositions(Array(cowCount).fill(0));
    setRaceStarted(true);
    setWinner(null);
  };

  const resetRace = () => {
    setPositions([]);
    setRaceStarted(false);
    setWinner(null);
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-2">Game Đua bò</h1>
      <Controls
        onStart={startRace}
        onReset={resetRace}
        setCowCount={setCowCount}
        cowCount={cowCount}
        raceTime={raceTime}
        setRaceTime={setRaceTime}
      />
      <RaceTrack cows={positions} />
      {winner !== null && (
        <Dialog open={winner !== null}>
          <DialogTrigger />
          <DialogContent>
            <DialogTitle>Chúng ta đã có con bò thắng cuộc!</DialogTitle>
            <DialogDescription>
              🏆 Bò số {winner} đã thắng trong đường đua!
            </DialogDescription>
            <button onClick={resetRace}>Đóng</button>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CowRace;
