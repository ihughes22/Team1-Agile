
import HTMLFlipBook from "react-pageflip";
import React, { useState } from "react";
import "./BookExample.css";

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="cover" ref={ref} data-density="hard">
      <div>
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <h1>Page Header</h1>
      <p>{props.children}</p>
      <p>{props.number}</p>
    </div>
  );
});
function BookExample(props) {
    const [inputText, setInputElement] = useState("");
    const [text, setText] = useState("sample text");
    const printText = () => {
      setText(inputText);
      setInputElement("");
    };
  
    // Set the desired number of content pages
    const numberOfPages = 10;

    // Create an array of page numbers for content pages
    const contentPageNumbers = Array.from({ length: numberOfPages }, (_, index) => index + 1);

    return (
        <div>
            <HTMLFlipBook
                width={550}
                height={650}
                minWidth={315}
                maxWidth={1000}
                minHeight={420}
                maxHeight={1350}
                showCover={true}
                flippingTime={1000}
                style={{ margin: "0 auto" }}
                maxShadowOpacity={0.5}
                className="album-web"
            >
                {/* Front Cover */}
                <PageCover>Front Cover</PageCover>

                {/* Content Pages */}
                {contentPageNumbers.map((pageNumber) => (
                    <Page key={pageNumber} number={pageNumber}>
                        <hr></hr>
                        <p>{text}</p>
                    </Page>
                ))}

                {/* Back Cover */}
                <PageCover>Back Cover</PageCover>
            </HTMLFlipBook>
        </div>
        

    );
}
  
  // ... (export statement)
  export default BookExample;
  