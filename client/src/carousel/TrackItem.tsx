import {
  memo,
  type CSSProperties,
} from "react";

import type { CarouselItem } from "./items";

import {
  placeAtSlot,
  slotOpacity,
} from "./geometry";

type Props = {
  item: CarouselItem;
  slot: number;
  centered: boolean;
  onStart?: () => void;
};

function TrackItemImpl({
  item,
  slot,
  centered,
  onStart,
}: Props) {
  const position = placeAtSlot(slot);
  const opacity = slotOpacity(slot);

  const cardClass = centered
    ? "dc-item dc-lesson-card dc-lesson-card--centered"
    : "dc-item dc-lesson-card";

  return (
    <div
      className={cardClass}
      style={
        {
          width: "430px",
          height: "560px",

          opacity: opacity,

          zIndex:
            1000 +
            Math.round(slot * 10),

          "--card-color": item.color,

          transform:
            "translate(calc(-50% + " +
            position.x +
            "px), calc(-50% + " +
            position.y +
            "px)) rotate(" +
            position.rotation +
            "deg)",
        } as CSSProperties
      }
    >
      <div className="dc-lesson-inner">

        {/* HEADER */}
        <div className="dc-lesson-header">

          <div className="dc-python-logo">
            <span>🐍</span>
          </div>

          <span className="dc-lesson-status">
            {item.progress === 0
              ? "Status: New"
              : "Status: In Progress"}
          </span>

        </div>


        {/* LESSON NUMBER */}
        <div className="dc-lesson-number">
          LESSON {item.chapter}
        </div>


        {/* TITLE */}
        <h2 className="dc-lesson-title">
          {item.label}
        </h2>


        {/* DESCRIPTION */}
        <p className="dc-lesson-description">
          {item.description}
        </p>


        {/* INFORMATION */}
        <div className="dc-lesson-info">

          <div>
            <strong>Level:</strong>
            <span>{item.level}</span>
          </div>

          <div>
            <strong>Practical:</strong>
            <span>
              {item.exercises} Exercises
            </span>
          </div>

        </div>


        {/* PROGRESS */}
        {item.progress > 0 && (
          <div className="dc-card-progress">

            <div className="dc-card-progress-bar">

              <div
                className="dc-card-progress-fill"
                style={{
                  width:
                    item.progress + "%",
                }}
              />

            </div>

            <span>
              {item.progress}% complete
            </span>

          </div>
        )}


        {/* START / CONTINUE BUTTON */}
        <button
          type="button"
          className="dc-start-button"
          onClick={(event) => {
            event.stopPropagation();
            onStart?.();
          }}
        >
          {item.progress > 0
            ? "Continue Lesson"
            : "Start Lesson"}
        </button>

      </div>
    </div>
  );
}

export const TrackItem =
  memo(TrackItemImpl);