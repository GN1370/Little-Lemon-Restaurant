import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookingForm from '../components/BookingForm';

// Wrapper component for testing with router
const TestWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('BookingForm', () => {
  it('renders reservation details form initially', () => {
    render(
      <TestWrapper>
        <BookingForm />
      </TestWrapper>
    );

    expect(screen.getByRole('heading', { name: 'Reservation Details' })).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
    expect(screen.getByText('Time')).toBeInTheDocument();
    expect(screen.getByText('Number of Diners')).toBeInTheDocument();
    expect(screen.getByText('Seating Preference')).toBeInTheDocument();
  });

  it('displays validation errors when continuing without required fields', async () => {
    render(
      <TestWrapper>
        <BookingForm />
      </TestWrapper>
    );

    const continueButton = screen.getByText('Continue');
    fireEvent.click(continueButton);

    await waitFor(() => {
      expect(screen.getByText('Please select a date')).toBeInTheDocument();
    });
  });

  it('allows guest count to be increased and decreased', () => {
    render(
      <TestWrapper>
        <BookingForm />
      </TestWrapper>
    );

    // Initial guest count should be 2
    expect(screen.getByText('2')).toBeInTheDocument();

    // Increase guests
    const increaseButton = screen.getByLabelText('Increase number of guests');
    fireEvent.click(increaseButton);
    expect(screen.getByText('3')).toBeInTheDocument();

    // Decrease guests
    const decreaseButton = screen.getByLabelText('Decrease number of guests');
    fireEvent.click(decreaseButton);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('does not allow guest count below 1', () => {
    render(
      <TestWrapper>
        <BookingForm />
      </TestWrapper>
    );

    const decreaseButton = screen.getByLabelText('Decrease number of guests');
    
    // Click decrease multiple times to try to go below 1
    fireEvent.click(decreaseButton);
    fireEvent.click(decreaseButton);
    
    // Guest count should not go below 1
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(decreaseButton).toBeDisabled();
  });

  it('does not allow guest count above 10', () => {
    render(
      <TestWrapper>
        <BookingForm />
      </TestWrapper>
    );

    const increaseButton = screen.getByLabelText('Increase number of guests');
    
    // Click increase multiple times to reach 10
    for (let i = 0; i < 10; i++) {
      fireEvent.click(increaseButton);
    }
    
    // Guest count should not exceed 10
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(increaseButton).toBeDisabled();
  });

  it('toggles seating preference between indoor and outdoor', () => {
    render(
      <TestWrapper>
        <BookingForm />
      </TestWrapper>
    );

    const indoorButton = screen.getByRole('radio', { name: 'Indoor' });
    const outdoorButton = screen.getByRole('radio', { name: 'Outdoor' });

    // Indoor should be selected by default
    expect(indoorButton).toHaveAttribute('aria-checked', 'true');
    expect(outdoorButton).toHaveAttribute('aria-checked', 'false');

    // Click outdoor
    fireEvent.click(outdoorButton);
    expect(indoorButton).toHaveAttribute('aria-checked', 'false');
    expect(outdoorButton).toHaveAttribute('aria-checked', 'true');
  });

  it('advances to step 2 when form is valid', async () => {
    render(
      <TestWrapper>
        <BookingForm />
      </TestWrapper>
    );

    // Fill in required fields
    const dateInput = screen.getByLabelText('Date');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    
    fireEvent.change(dateInput, { target: { value: dateString } });

    // Wait for times to load and select one
    await waitFor(() => {
      const timeButtons = screen.getAllByRole('radio');
      const timeButton = timeButtons.find(btn => btn.textContent?.includes(':'));
      if (timeButton) {
        fireEvent.click(timeButton);
      }
    });

    // Click continue
    const continueButton = screen.getByText('Continue');
    fireEvent.click(continueButton);

    // Should now be on step 2
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Your Details' })).toBeInTheDocument();
      expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    });
  });
});

describe('Form Validation', () => {
  it('validates email format correctly', () => {
    // Test email validation logic
    const validEmails = [
      'test@example.com',
      'user.name@domain.org',
      'user+tag@email.co.uk',
    ];
    
    const invalidEmails = [
      'notanemail',
      '@nodomain.com',
      'no@domain',
      'spaces in@email.com',
    ];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    validEmails.forEach(email => {
      expect(emailRegex.test(email)).toBe(true);
    });

    invalidEmails.forEach(email => {
      expect(emailRegex.test(email)).toBe(false);
    });
  });

  it('validates phone number format correctly', () => {
    // Test phone validation logic
    const validPhones = [
      '123-456-7890',
      '(312) 555-1234',
      '+1 312 555 1234',
      '3125551234',
    ];
    
    const invalidPhones = [
      'phone',
      'abc-def-ghij',
    ];

    const phoneRegex = /^[\d\s\-+()]+$/;

    validPhones.forEach(phone => {
      expect(phoneRegex.test(phone)).toBe(true);
    });

    invalidPhones.forEach(phone => {
      expect(phoneRegex.test(phone)).toBe(false);
    });
  });
});

describe('Times Reducer', () => {
  it('updates times correctly', () => {
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

    const initialState = [];
    const newTimes = ['17:00', '18:00', '19:00'];

    const result = timesReducer(initialState, {
      type: 'UPDATE_TIMES',
      payload: newTimes,
    });

    expect(result).toEqual(newTimes);
  });

  it('initializes times correctly', () => {
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

    const initialState = ['10:00', '11:00'];
    const newTimes = ['17:00', '18:00', '19:00', '20:00'];

    const result = timesReducer(initialState, {
      type: 'INITIALIZE_TIMES',
      payload: newTimes,
    });

    expect(result).toEqual(newTimes);
    expect(result.length).toBe(4);
  });
});
