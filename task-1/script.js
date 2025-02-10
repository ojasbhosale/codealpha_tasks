document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle")
    const form = document.getElementById("age-form")
    const resultOverlay = document.getElementById("result-overlay")
    const closeResult = document.getElementById("close-result")
    const dayInput = document.getElementById("day")
    const monthInput = document.getElementById("month")
    const yearInput = document.getElementById("year")
  
    // Theme Toggle
    themeToggle.addEventListener("change", () => {
      document.body.classList.toggle("dark")
    })
  
    // Validate inputs as user types
    const inputs = [dayInput, monthInput, yearInput]
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        validateInput(input)
      })
    })
  
    // Form submission
    form.addEventListener("submit", (e) => {
      e.preventDefault()
  
      if (validateForm()) {
        const birthDate = new Date(
          Number.parseInt(yearInput.value),
          Number.parseInt(monthInput.value) - 1,
          Number.parseInt(dayInput.value),
        )
  
        const age = calculateAge(birthDate)
        displayResult(age)
      }
    })
  
    // Close result overlay
    closeResult.addEventListener("click", () => {
      resultOverlay.classList.remove("active")
    })
  
    // Click outside to close
    resultOverlay.addEventListener("click", (e) => {
      if (e.target === resultOverlay) {
        resultOverlay.classList.remove("active")
      }
    })
  
    function validateInput(input) {
      const value = Number.parseInt(input.value)
      const currentYear = new Date().getFullYear()
  
      switch (input.id) {
        case "day":
          if (value < 1 || value > 31) {
            input.setCustomValidity("Day must be between 1 and 31")
          } else {
            input.setCustomValidity("")
          }
          break
        case "month":
          if (value < 1 || value > 12) {
            input.setCustomValidity("Month must be between 1 and 12")
          } else {
            input.setCustomValidity("")
          }
          break
        case "year":
          if (value < 1900 || value > currentYear) {
            input.setCustomValidity(`Year must be between 1900 and ${currentYear}`)
          } else {
            input.setCustomValidity("")
          }
          break
      }
    }
  
    function validateForm() {
      const day = Number.parseInt(dayInput.value)
      const month = Number.parseInt(monthInput.value)
      const year = Number.parseInt(yearInput.value)
      const date = new Date(year, month - 1, day)
      const currentDate = new Date()
  
      // Check if date is valid
      if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
        alert("Please enter a valid date")
        return false
      }
  
      // Check if date is in the future
      if (date > currentDate) {
        alert("Birth date cannot be in the future")
        return false
      }
  
      return true
    }
  
    function calculateAge(birthDate) {
      const currentDate = new Date()
      let years = currentDate.getFullYear() - birthDate.getFullYear()
      let months = currentDate.getMonth() - birthDate.getMonth()
      let days = currentDate.getDate() - birthDate.getDate()
  
      // Adjust months and years if days are negative
      if (days < 0) {
        months--
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, birthDate.getDate())
        days = Math.floor((currentDate - lastMonth) / (1000 * 60 * 60 * 24))
      }
  
      // Adjust years if months are negative
      if (months < 0) {
        years--
        months += 12
      }
  
      return { years, months, days }
    }
  
    function displayResult(age) {
      document.getElementById("years").textContent = age.years
      document.getElementById("months").textContent = age.months
      document.getElementById("days").textContent = age.days
  
      resultOverlay.classList.add("active")
  
      // Animate numbers
      ;["years", "months", "days"].forEach((unit) => {
        const element = document.getElementById(unit)
        const finalValue = age[unit]
        animateNumber(element, finalValue)
      })
    }
  
    function animateNumber(element, final) {
      let current = 0
      const duration = 1000 // 1 second
      const stepTime = 50 // Update every 50ms
      const steps = duration / stepTime
      const increment = final / steps
  
      const timer = setInterval(() => {
        current += increment
        if (current >= final) {
          current = final
          clearInterval(timer)
        }
        element.textContent = Math.floor(current)
      }, stepTime)
    }
  })
  
  