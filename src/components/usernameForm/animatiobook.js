import React from "react";

const AnimationBook = () => {
    const book = document.querySelector(".modal");
    const firstHalf = document.querySelector(".first-half");
    const secondHalf = document.querySelector(".second-half");
    
    return (

       <div>
        
        {book.addEventListener("click", () => {
          book.classList.toggle("flip");
        })}
        
        {firstHalf.addEventListener("mouseenter", () => {
          book.classList.add("rotateLeft");
        })}
        
        {firstHalf.addEventListener("mouseout", () => {
          book.classList.remove("rotateLeft");
        })}
        
        {secondHalf.addEventListener("mouseenter", () => {
          book.classList.add("rotateRight");
        })}
        
        {secondHalf.addEventListener("mouseout", () => {
          book.classList.remove("rotateRight");
        })}
</div>
    );
}
 
export default AnimationBook;