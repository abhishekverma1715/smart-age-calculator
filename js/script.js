document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date-input');
    let birthdayInterval;

    // Calculate age and update UI whenever the date changes
    dateInput.addEventListener('input', () => {
        const dob = dateInput.value;
        if (dob) {
            calculateAndDisplay(dob);
        }
    });

    function calculateAndDisplay(dobString) {
        const dob = new Date(dobString);
        const today = new Date();

        // Error handling for future dates
        if (dob > today) {
            alert("Date of birth cannot be in the future. Please select a valid date.");
            resetUI();
            return;
        }

        // --- Core Age Calculation ---
        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();

        if (days < 0) {
            months--;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        document.getElementById('years').textContent = years;
        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = days;

        // --- Extra Features ---
        startNextBirthdayCountdown(dob);
        displayZodiacSign(dob);
        displayDayOfWeek(dob);
        displaySummary(today, dob);
    }

    function startNextBirthdayCountdown(dob) {
        if (birthdayInterval) clearInterval(birthdayInterval);

        birthdayInterval = setInterval(() => {
            const now = new Date();
            const currentYear = now.getFullYear();
            let nextBirthday = new Date(currentYear, dob.getMonth(), dob.getDate());

            if (now > nextBirthday) {
                nextBirthday.setFullYear(currentYear + 1);
            }

            const diff = nextBirthday - now;
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('next-birthday').textContent = `${d}d ${h}h ${m}m ${s}s`;
        }, 1000);
    }
    
    function displayZodiacSign(dob) {
        const day = dob.getDate();
        const month = dob.getMonth() + 1;
        let sign = "";
        if((month==1 && day>=20)||(month==2 && day<=18)) sign="Aquarius";
        else if((month==2 && day>=19)||(month==3 && day<=20)) sign="Pisces";
        else if((month==3 && day>=21)||(month==4 && day<=19)) sign="Aries";
        else if((month==4 && day>=20)||(month==5 && day<=20)) sign="Taurus";
        else if((month==5 && day>=21)||(month==6 && day<=20)) sign="Gemini";
        else if((month==6 && day>=21)||(month==7 && day<=22)) sign="Cancer";
        else if((month==7 && day>=23)||(month==8 && day<=22)) sign="Leo";
        else if((month==8 && day>=23)||(month==9 && day<=22)) sign="Virgo";
        else if((month==9 && day>=23)||(month==10 && day<=22)) sign="Libra";
        else if((month==10 && day>=23)||(month==11 && day<=21)) sign="Scorpio";
        else if((month==11 && day>=22)||(month==12 && day<=21)) sign="Sagittarius";
        else sign="Capricorn"; //((month==12 && day>=22)||(month==1 && day<=19))
        document.getElementById('zodiac-sign').textContent = sign;
    }

    function displayDayOfWeek(dob) {
        const day = dob.toLocaleDateString('en-US', { weekday: 'long' });
        document.getElementById('day-of-week').textContent = day;
    }

    function displaySummary(today, dob) {
        const diff = today - dob; // Difference in milliseconds
        const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        const totalMonths = (today.getFullYear() - dob.getFullYear()) * 12 + (today.getMonth() - dob.getMonth());
        
        document.getElementById('total-months').textContent = totalMonths.toLocaleString();
        document.getElementById('total-weeks').textContent = Math.floor(totalDays / 7).toLocaleString();
        document.getElementById('total-days').textContent = totalDays.toLocaleString();
        document.getElementById('total-hours').textContent = (totalDays * 24).toLocaleString();
    }

    function resetUI() {
        document.getElementById('years').textContent = '0';
        document.getElementById('months').textContent = '0';
        document.getElementById('days').textContent = '0';
        document.getElementById('next-birthday').textContent = '--';
        document.getElementById('zodiac-sign').textContent = '--';
        document.getElementById('day-of-week').textContent = '--';
        document.getElementById('total-months').textContent = '0';
        document.getElementById('total-weeks').textContent = '0';
        document.getElementById('total-days').textContent = '0';
        document.getElementById('total-hours').textContent = '0';
        if (birthdayInterval) clearInterval(birthdayInterval);
    }
});