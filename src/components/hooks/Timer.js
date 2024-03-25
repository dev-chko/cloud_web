import React, { useState, useEffect } from "react";

function Timer({ onFinish }) {
  const [seconds, setSeconds] = useState(180); // 180초(3분)로 초기화

  useEffect(() => {
    const timer = setTimeout(() => {
      setSeconds((seconds) => seconds - 1); // 1초씩 감소
    }, 1000); // 1초(1000ms)마다 실행

    // 타이머 종료 시 clearInterval()을 호출하여 메모리 누수를 방지합니다.
    if (seconds === 0) {
      clearInterval(timer);
      onFinish && onFinish();
    }

    // cleanup 함수에서 clearInterval() 함수를 호출하여 타이머를 취소합니다.
    return () => clearInterval(timer);
  }, [seconds, onFinish]);

  return (
    <div className="text-right">
      {seconds === 0 ? (
        <p className="text-red-600 font-bold">시간 초과</p>
      ) : (
        <p>남은 시간: {seconds}초</p>
      )}
    </div>
  );
}

export default Timer;
