import { useState, useRef } from "react";

export default function CatFriends() {
  const [index, setIndex] = useState(0);
  const catRefsMap = useRef(null);
  if (!catRefsMap.current) {
    catRefsMap.current = new Map();
  } else {
  }
  function handleScrollToCat(index) {
    const node = catRefsMap.current.get(catList[index]);
    node.scrollIntoView({
      container: "nearest",
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }
  return (
    <div id="wrapper">
      <div>
        <ul>
          {catList.map((cat, i) => (
            <li
              key={cat.id}
              ref={(node) => {
                catRefsMap.current.set(cat, node);
                return () => catRefsMap.current.delete(cat);
              }}
            >
              <img
                className={index === i ? "active" : "cat"}
                src={cat.imageUrl}
                alt={"Cat #" + cat.id}
              />
            </li>
          ))}
        </ul>
      </div>
      <nav>
        <button
          onClick={() => {
            if (index < catList.length - 1) {
              setIndex(index + 1);
              handleScrollToCat(index + 1);
            } else {
              setIndex(0);
              handleScrollToCat(0);
            }
          }}
        >
          <div id="right-arrow">&rarr;</div>
        </button>
      </nav>
    </div>
  );
}

const catCount = 10;
const catList = new Array(catCount);
for (let i = 0; i < catCount; i++) {
  const bucket = Math.floor(Math.random() * catCount) % 2;
  let imageUrl = "";
  switch (bucket) {
    case 0: {
      imageUrl = "https://placecats.com/neo/250/200";
      break;
    }
    case 1: {
      imageUrl = "https://placecats.com/millie/250/200";
      break;
    }
    case 2:
    default: {
      imageUrl = "https://placecats.com/bella/250/200";
      break;
    }
  }
  catList[i] = {
    id: i,
    imageUrl,
  };
}
