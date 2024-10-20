// Load all category for category buttons
const loadCategory = async() => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
        const data = await response.json();
        displayCategory(data.categories);
    } catch (error) {
        console.error(error);
    }
}

// Display all category as category buttons
const displayCategory = (categories) => {
    const categorySection = document.getElementById('category-btns');

    categories.forEach(element => {
        const categoryButton = document.createElement('button');
        categoryButton.classList = 'w-full h-28 category-btn btn btn-lg btn-ghost rounded-2xl border border-[#0E7A8126] inline-flex flex-col sm:flex-row items-center justify-center gap-2';
        categoryButton.id = `${(element.category).toLowerCase()}`;
        categoryButton.setAttribute('onclick', `loadPetsByCategory("${(element.category).toLowerCase()}")`)
        categoryButton.innerHTML = `
        <img src="${element.category_icon}"> ${element.category}
        `
        categorySection.appendChild(categoryButton);
    });
}

// Load all pets
const loadAllPets = async() => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
        const data = await response.json();
        displayPets(data.pets);

        document.getElementById('sort-button').addEventListener('click', () => {
            sortButton(data.pets);
        })
    } catch (error) {
        console.error(error);
    }
}

// Load pets by category
const loadPetsByCategory = async(category) => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
        const data = await response.json();

        const categoryButton = document.getElementById(category);
        const categoryButtons = document.getElementsByClassName('category-btn');
        for (const button of categoryButtons) {
            button.classList.remove('bg-[#0E7A811A]', 'border-[#0E7A81]', 'rounded-[7.5rem]');
            button.classList.add('btn-ghost', 'border-[#0E7A8126]', 'rounded-2xl');
        }
        categoryButton.classList.remove('btn-ghost', 'border-[#0E7A8126]', 'rounded-2xl');
        categoryButton.classList.add('bg-[#0E7A811A]', 'border-[#0E7A81]', 'rounded-[7.5rem]');

        displayPets(data.data);

        document.getElementById('sort-button').addEventListener('click', () => {
            sortButton(data.data);
        })
    } catch (error) {
        console.error(error);
    }
}

// Display pets according to input
const displayPets = (pets) => {
    
    const petsContainer = document.getElementById('pets-container');
    const likedImageContainer = document.getElementById('liked-image');
    likedImageContainer.style.display = "none";
    petsContainer.classList = "w-full h-[30rem] flex flex-col items-center justify-center gap-4 text-center"
    petsContainer.innerHTML = `
    <div class="loading loading-bars loading-lg"></div>
    `;

    setTimeout(() => {
        likedImageContainer.style.display = "grid";
        petsContainer.innerHTML = "";

        if (pets.length === 0) {
            petsContainer.classList = "w-full lg:w-[74.5%] h-[30rem] bg-[#13131308] rounded-[1.5rem] flex flex-col items-center justify-center gap-4 text-center px-[1rem] sm:px-[2rem] lg:px-[6rem]"
            petsContainer.innerHTML = `
            <img src="assets/error.webp">
            <h1 class="text-2xl sm:text-3xl font-black text-[#131313]">No Information Available</h1>
            <p class="text-sm sm:text-base font-normal text-[#131313B3]">Sorry, there are no pets available in this category at the moment. Please check back later or explore other categories for your perfect companion.</p>
            `;
        } else {
            petsContainer.classList = "w-full lg:w-[74.5%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6";
            pets.forEach(element => {
                const petCard = document.createElement('div');
                petCard.classList = 'card w-full bg-base-100 border border-[#1313131A] rounded-xl';
                petCard.innerHTML = `
                <figure class="w-full lg:h-40 md:h-40 sm:h-48 h-56 px-4 pt-4">
                  <img
                    class="w-full h-full rounded-lg object-cover"
                    src= ${element.image} 
                    alt="Shoes" />
                </figure>
        
                <div class="card-body p-4">
        
                  <h2 class="text-2xl sm:text-xl font-bold text-[#131313]">${element.pet_name}</h2>
        
                  <p class="sm:text-base text-lg font-normal text-[#131313B3] flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                    </svg>
                    Breed: ${element.breed ? element.breed : "Unknown"}</p>
        
                  <p class="sm:text-base text-lg font-normal text-[#131313B3] flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                    </svg>
                    Birth: ${element.date_of_birth? element.date_of_birth : "Unknown"}</p>
        
                  <p class="sm:text-base text-lg font-normal text-[#131313B3] flex items-center gap-2">
                    <img width="16" height="16" src="https://img.icons8.com/tiny-glyph/16/gender.png" alt="gender"/>
                    Gender: ${element.gender ? element.gender : "Unknown"}</p>
        
                  <p class="sm:text-base text-lg font-normal text-[#131313B3] flex items-center gap-2 pb-4 border-b border-[#1313131A]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Price : ${element.price ? element.price + "$" : "TBA"}</p>
        
                  <div class="w-full pt-2 grid grid-cols-3 gap-3">

                    <button onclick="likeButton(${element.petId})" class="btn w-full btn-md md:btn-sm btn-ghost border border-[#1313131A]"><img width="24" height="24" src="https://img.icons8.com/material-outlined/24/facebook-like--v1.png" alt="facebook-like--v1"/></button>

                    <button onclick="adoptButton(this)" class="btn w-full btn-md md:btn-sm btn-ghost border border-[#1313131A]">Adopt</button>

                    <button onclick="loadDetails(${element.petId})" class="btn w-full btn-md md:btn-sm btn-ghost border border-[#1313131A]">Details</button>

                  </div>
                              
                </div>
                `;
                petsContainer.appendChild(petCard);
            })
        }
    }, 2000);
}

//  Load details of a pet
const loadDetails = async(id) => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
        const data = await response.json();
        displayDetails(data.petData);
    } catch (error) {
        console.error(error);
    }
}

//  Display details on modal
const displayDetails = (pet) => {
    const detailsContainer = document.getElementById('modal-content');

    detailsContainer.innerHTML = `
    <img class="w-full h-60 sm:h-80 object-cover rounded-lg" src= ${pet.image} alt="">
    <h1 class="text-lg sm:text-xl md:text-2xl font-black text-[#131313]">${pet.pet_name}</h1>

    <div class="w-full grid grid-cols-1 md:grid-cols-2">
                
        <p class="text-sm md:text-base font-normal text-[#131313B3] flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
          </svg>
          Breed: ${pet.breed ? pet.breed : "Unknown"}</p>

        <p class="text-sm md:text-base font-normal text-[#131313B3] flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
          </svg>
          Birth: ${pet.date_of_birth ? pet.date_of_birth : "Unknown"}</p>
        
        <p class="text-sm md:text-base font-normal text-[#131313B3] flex items-center gap-2">
          <img width="16" height="16" src="https://img.icons8.com/tiny-glyph/16/gender.png" alt="gender"/>
          Gender: ${pet.gender ? pet.gender : "Unknown"}</p>
        
        <p class="text-sm md:text-base font-normal text-[#131313B3] flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Price : ${pet.price ? pet.price + "$" : "TBA"}</p>

        <p class="text-sm md:text-base font-normal text-[#131313B3] flex items-center gap-2">
          <img width="16" height="16" src="https://img.icons8.com/material-outlined/24/syringe.png" alt="syringe"/>
          Vaccinated status: ${pet.vaccinated_status ? pet.vaccinated_status : "Unknown"}</p>
    </div>

    <hr class="text-[#1313131A]">

    <h4 class="text-sm md:text-base font-black text-[#131313B3]">Details Information</h4>
    <p class="text-sm md:text-base font-normal text-[#131313B3]">${pet.pet_details ? pet.pet_details : "We've got no details regarding this pet."}</p>
    `;

    console.log(detailsContainer);
    document.getElementById('my_modal_1').showModal();
}

// Sort button functionality
const sortButton = async(petArray) => {
    petArrayDescByPrice = petArray.sort((a, b) => b.price - a.price);
    displayPets(petArrayDescByPrice);
}

// Like button functionality
const likeButton = async(id) => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
        const data = await response.json();
        const imgURL = data.petData.image;
    
        const likedImageContainer = document.getElementById('liked-image');
    
        const newLikedImage = document.createElement('div');
        newLikedImage.classList = "w-full h-32";
        newLikedImage.innerHTML = `
        <img class="w-full h-full object-cover" src=${imgURL}>
        `;
        // newLikedImage.setAttribute('src', imgURL);
        // newLikedImage.classList = "w-full h-32 rounded-lg object-cover";
        console.log(newLikedImage);
    
        likedImageContainer.appendChild(newLikedImage);
    } catch (error) {
        console.error(error);
    }
}

// Adopt button functionality
const adoptButton = (event) => {
    const modal = document.getElementById('countdownModal');
    const countdownDisplay = document.getElementById('countdown');
    let countdown = 3;

    modal.classList.add('modal-open');

    function updateCountdown() {
        countdownDisplay.innerText = countdown;
        countdown--;

        if (countdown >= 0) {
            setTimeout(updateCountdown, 1000);
        }
    }

    updateCountdown();

    setTimeout(() => {
        modal.classList.remove('modal-open');
        event.innerText = "Adopted";
        event.setAttribute('disabled', true);
    }, 3000);
}

// To apply smooth scroll
const smoothScrollTo = (targetId) => {
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Handle subscribe mail input
const handleSubscribe = () => {
    const mail = document.getElementById('subscribe-mail').value;

    if (mail === "" || !mail.includes('@')) {
        alert("Please enter valid mail for subscription.")
    } else {
        alert(`Subscription with ${mail} has successfully completed! You'll get all latest updates about our news letters in your email.`);
    }
    document.getElementById('subscribe-mail').value = '';
}

loadCategory();
loadAllPets();