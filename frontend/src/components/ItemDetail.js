import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ItemDetail.css';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: "Plus Jakarta Sans, Noto Sans, sans-serif" }}>
      <div className="layout-container flex h-full grow flex-col">
        <nav className="navbar">
          <div className="logo-container">
            <div className="logo">
              <img className="nav-logo" src="https://res.cloudinary.com/djs1us6h2/image/upload/v1735626575/cheeseburger_2_rk66mk.png" alt="Logo" />
              Food Recipe
            </div>
          </div>
          <div className="navbar-buttons">
            <button className="home-button" onClick={() => navigate('/dashboard')}>Home</button>
          </div>
        </nav>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:px-4 @[480px]:py-3">
                <div
                  className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-[#FFFFFF] @[480px]:rounded-xl min-h-[218px]"
                  style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url(http://localhost:5000/images/${recipe.coverImage})` }}
                >
                  <div className="flex p-4">
                    <p className="text-white tracking-light text-[28px] font-bold leading-tight">{recipe.title}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#1C160C] tracking-light text-[32px] font-bold leading-tight">{recipe.title}</p>
                <p className="text-[#A18249] text-sm font-normal leading-normal">Duration: {recipe.time} | Chef: {recipe.chef} | Non-veg | {recipe.rating}</p>
              </div>
            </div>
            <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
              {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="col-span-2 grid grid-cols-subgrid border-t border-t-[#E9DFCE] py-5">
                  <p className="text-[#A18249] text-sm font-normal leading-normal">{ingredient.name}</p>
                  <p className="text-[#1C160C] text-sm font-normal leading-normal">{ingredient.quantity}</p>
                </div>
              ))}
            </div>
            <h2 className="text-[#1C160C] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Directions</h2>
            <div className="flex flex-col p-4">
              {recipe.directions && recipe.directions.map((step, index) => (
                <details key={index} className="flex flex-col border-t border-t-[#E9DFCE] py-2 group" open={index === 0}>
                  <summary className="flex cursor-pointer items-center justify-between gap-6 py-2">
                    <p className="text-[#1C160C] text-sm font-medium leading-normal">Step {index + 1}</p>
                    <div className="text-[#1C160C] group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                  </summary>
                  <p className="text-[#A18249] text-sm font-normal leading-normal pb-2">{step}</p>
                </details>
              ))}
            </div>
            <h2 className="text-[#1C160C] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Cooked this? Comment and rate the recipe</h2>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#1C160C] text-base font-medium leading-normal pb-2">Email</p>
                <textarea
                  placeholder="Enter your email"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1C160C] focus:outline-0 focus:ring-0 border border-[#E9DFCE] bg-[#FFFFFF] focus:border-[#E9DFCE] min-h-36 placeholder:text-[#A18249] p-[15px] text-base font-normal leading-normal"
                ></textarea>
              </label>
            </div>
            <div className="flex px-4 py-3 justify-start">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#019863] text-[#FFFFFF] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Submit Comment</span>
              </button>
            </div>
            <h2 className="text-[#1C160C] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Comments</h2>
            <div className="flex flex-col gap-8 overflow-x-hidden bg-[#FFFFFF] p-4">
              {/* Sample comments */}
              <div className="flex flex-col gap-3 bg-[#FFFFFF]">
                <div className="flex items-center gap-3">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                    style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/6fb1d883-8461-4b9a-9209-d739ecd59743.png")' }}
                  ></div>
                  <div className="flex-1">
                    <p className="text-[#1C160C] text-base font-medium leading-normal">Shanmuga Pandiyan</p>
                    <p className="text-[#A18249] text-sm font-normal leading-normal">Today</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array(4).fill().map((_, i) => (
                    <div key={i} className="text-[#019863]" data-icon="Star" data-size="20px" data-weight="fill">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                      </svg>
                    </div>
                  ))}
                  <div className="text-[#D0BB95]" data-icon="Star" data-size="20px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z"></path>
                    </svg>
                  </div>
                </div>
                <p className="text-[#1C160C] text-base font-normal leading-normal">
                  I tried the recipe with chicken and it turned out perfect! Thanks for the precise details and helpful method. Can't wait to try this again with mutton next time.
                </p>
                <div className="flex gap-9 text-[#A18249]">
                  <button className="flex items-center gap-2">
                    <div className="text-inherit" data-icon="ThumbsUp" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"></path>
                      </svg>
                    </div>
                    <p className="text-inherit">3</p>
                  </button>
                  <button className="flex items-center gap-2">
                    <div className="text-inherit" data-icon="ThumbsDown" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z"></path>
                      </svg>
                    </div>
                    <p className="text-inherit">1</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
