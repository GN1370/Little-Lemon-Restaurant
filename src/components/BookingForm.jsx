import { useReducer, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus } from 'lucide-react';
import styles from '../styles/BookingForm.module.css';

// Times reducer for managing available times
const timesReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return action.payload;
    case 'INITIALIZE_TIMES':
      return action.payload;
    default:
      return state;
  }
};

// Mock API functions (simulating the external API)
const fetchAPI = (date) => {
  // Generate available times based on the date
  const times = [];
  const dayOfWeek = date.getDay();
  
  // Different availability for weekends vs weekdays
  const startHour = dayOfWeek === 0 || dayOfWeek === 6 ? 10 : 11;
  const endHour = dayOfWeek === 0 ? 21 : dayOfWeek === 6 ? 23 : 22;
  
  for (let hour = startHour; hour <= endHour; hour++) {
    times.push(`${hour.toString().padStart(2, '0')}:00`);
    if (hour < endHour) {
      times.push(`${hour.toString().padStart(2, '0')}:30`);
    }
  }
  
  // Randomly remove some times to simulate bookings
  return times.filter(() => Math.random() > 0.3);
};

const submitAPI = (formData) => {
  // Simulate API submission - always succeeds for demo
  console.log('Submitting booking:', formData);
  return true;
};

// Initialize times with today's date
const initializeTimes = () => {
  return fetchAPI(new Date());
};

const BookingForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [availableTimes, dispatch] = useReducer(timesReducer, [], initializeTimes);
  
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 2,
    seating: 'indoor',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    occasion: '',
    specialRequests: '',
  });
  
  const [errors, setErrors] = useState({});

  // Update available times when date changes
  useEffect(() => {
    if (formData.date) {
      const newTimes = fetchAPI(new Date(formData.date));
      dispatch({ type: 'UPDATE_TIMES', payload: newTimes });
      // Reset selected time if no longer available
      if (!newTimes.includes(formData.time)) {
        setFormData(prev => ({ ...prev, time: '' }));
      }
    }
  }, [formData.date]);

  // Validation functions
  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Please select a future date';
      }
    }
    
    if (!formData.time) {
      newErrors.time = 'Please select a time';
    }
    
    if (formData.guests < 1 || formData.guests > 10) {
      newErrors.guests = 'Number of guests must be between 1 and 10';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-+()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
    // Submit the form
    const success = submitAPI(formData);
    
    if (success) {
      // Save to localStorage
      const bookingData = {
        ...formData,
        confirmationNumber: generateConfirmationNumber(),
        submittedAt: new Date().toISOString(),
      };
      localStorage.setItem('latestBooking', JSON.stringify(bookingData));
      
      // Navigate to confirmation page
      navigate('/confirmation', { state: bookingData });
    }
  };

  const generateConfirmationNumber = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const updateGuests = (delta) => {
    const newValue = formData.guests + delta;
    if (newValue >= 1 && newValue <= 10) {
      setFormData(prev => ({ ...prev, guests: newValue }));
    }
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={styles.wrapper}>
      {/* Progress Indicator */}
      <div className={styles.progress}>
        <span className={step === 1 ? styles.progressStepActive : styles.progressStep}>
          Reservation Details
        </span>
        <span className={styles.progressArrow}>→</span>
        <span className={step === 2 ? styles.progressStepActive : styles.progressStep}>
          Your Details
        </span>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {step === 1 && (
          <div className={styles.form}>
            <h2 className={styles.sectionTitle}>Reservation Details</h2>
            
            {/* Date */}
            <div className={styles.field}>
              <label htmlFor="date" className={styles.label}>
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                min={today}
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
                aria-describedby={errors.date ? 'date-error' : undefined}
                required
              />
              {errors.date && (
                <p id="date-error" className={styles.error} role="alert">
                  {errors.date}
                </p>
              )}
            </div>

            {/* Time */}
            <div className={styles.field}>
              <label className={styles.label}>Time</label>
              <div className={styles.timeGrid} role="radiogroup" aria-label="Select a time">
                {availableTimes.length > 0 ? (
                  availableTimes.slice(0, 6).map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, time }))}
                      className={`${styles.timeSlot} ${formData.time === time ? styles.timeSlotSelected : ''}`}
                      role="radio"
                      aria-checked={formData.time === time}
                    >
                      {time}
                    </button>
                  ))
                ) : (
                  <p className={styles.noTimes}>
                    Please select a date to see available times
                  </p>
                )}
              </div>
              {errors.time && (
                <p className={styles.error} role="alert">
                  {errors.time}
                </p>
              )}
            </div>

            {/* Number of Guests */}
            <div className={styles.field}>
              <label className={styles.label}>Number of Diners</label>
              <div className={styles.guestCounter}>
                <button
                  type="button"
                  onClick={() => updateGuests(-1)}
                  className={styles.guestButton}
                  disabled={formData.guests <= 1}
                  aria-label="Decrease number of guests"
                >
                  <Minus size={20} />
                </button>
                <span className={styles.guestCount} aria-live="polite">
                  {formData.guests}
                </span>
                <button
                  type="button"
                  onClick={() => updateGuests(1)}
                  className={styles.guestButton}
                  disabled={formData.guests >= 10}
                  aria-label="Increase number of guests"
                >
                  <Plus size={20} />
                </button>
              </div>
              {errors.guests && (
                <p className={styles.error} role="alert">
                  {errors.guests}
                </p>
              )}
            </div>

            {/* Seating Preference */}
            <div className={styles.field}>
              <label className={styles.label}>Seating Preference</label>
              <div className={styles.seatingOptions} role="radiogroup" aria-label="Seating preference">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, seating: 'indoor' }))}
                  className={`${styles.seatingOption} ${formData.seating === 'indoor' ? styles.seatingOptionSelected : ''}`}
                  role="radio"
                  aria-checked={formData.seating === 'indoor'}
                >
                  Indoor
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, seating: 'outdoor' }))}
                  className={`${styles.seatingOption} ${formData.seating === 'outdoor' ? styles.seatingOptionSelected : ''}`}
                  role="radio"
                  aria-checked={formData.seating === 'outdoor'}
                >
                  Outdoor
                </button>
              </div>
            </div>

            {/* Occasion (Optional) */}
            <div className={styles.field}>
              <label htmlFor="occasion" className={styles.label}>
                Occasion (Optional)
              </label>
              <select
                id="occasion"
                name="occasion"
                value={formData.occasion}
                onChange={(e) => setFormData(prev => ({ ...prev, occasion: e.target.value }))}
                className={styles.select}
              >
                <option value="">Select an occasion</option>
                <option value="birthday">Birthday</option>
                <option value="anniversary">Anniversary</option>
                <option value="engagement">Engagement</option>
                <option value="business">Business Meeting</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleContinue}
              className={styles.buttonPrimary}
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className={styles.form}>
            <h2 className={styles.sectionTitle}>Your Details</h2>
            
            {/* First Name */}
            <div className={styles.field}>
              <label htmlFor="firstName" className={styles.label}>
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                placeholder="Enter First Name"
                aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                required
              />
              {errors.firstName && (
                <p id="firstName-error" className={styles.error} role="alert">
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className={styles.field}>
              <label htmlFor="lastName" className={styles.label}>
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                placeholder="Enter Last Name"
                aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                required
              />
              {errors.lastName && (
                <p id="lastName-error" className={styles.error} role="alert">
                  {errors.lastName}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className={styles.field}>
              <label htmlFor="phone" className={styles.label}>
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                placeholder="Enter Phone Number"
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                required
              />
              {errors.phone && (
                <p id="phone-error" className={styles.error} role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Email */}
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Email (Optional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="Enter Email"
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className={styles.error} role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Special Requests */}
            <div className={styles.field}>
              <label htmlFor="specialRequests" className={styles.label}>
                Special Requests (Optional)
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Any special requests?"
                maxLength={500}
              />
            </div>

            <div className={styles.buttonRow}>
              <button
                type="button"
                onClick={() => setStep(1)}
                className={styles.buttonSecondary}
              >
                Back
              </button>
              <button
                type="submit"
                className={styles.buttonPrimary}
              >
                Confirm Reservation
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;
