import { createSlice } from '@reduxjs/toolkit';

export const mesmerizingCarouselSlice = createSlice({
  name: 'mesmerizingCarousel',
  initialState: {
    image_array: [
      {
        src: './assets/panda-pink.webp',
        name: 'Panda Pink Special',
        reasonItIsHere: 'default',
        uuid: crypto.randomUUID(),
      },
      {
        src: './assets/panda-arm.webp',
        name: 'Panda Arm Dish',
        reasonItIsHere: 'default',
        uuid: crypto.randomUUID(),
      },
      {
        src: './assets/panda-blue.webp',
        name: 'Panda Blue Delight',
        reasonItIsHere: 'default',
        uuid: crypto.randomUUID(),
      },
      {
        src: './assets/panda-hooters.webp',
        name: 'Panda Hooters Style',
        reasonItIsHere: 'default',
        uuid: crypto.randomUUID(),
      },
      {
        src: './assets/panda-poster.webp',
        name: 'Panda Poster',
        reasonItIsHere: 'default',
        uuid: crypto.randomUUID(),
      },
      {
        src: './assets/panda-red.webp',
        name: 'Panda Red Creation',
        reasonItIsHere: 'default',
        uuid: crypto.randomUUID(),
      },
    ],
  },
  reducers: {
    addImage: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.image_array.push(action.payload);
    },
    removeImage: (state, action) => {
      // Fixed: Actually assign the filtered result back to the array
      state.image_array = state.image_array.filter((value) => value.uuid !== action.payload);
    },
    // Implementation for changing image properties by UUID
    changeImageKey: (state, action) => {
      const { uuid, key, value } = action.payload;
      const imageIndex = state.image_array.findIndex((image) => image.uuid === uuid);
      if (imageIndex !== -1) {
        state.image_array[imageIndex][key] = value;
      }
    },
    // Alternative: Update entire image object by UUID
    updateImage: (state, action) => {
      const { uuid, updates } = action.payload;
      const imageIndex = state.image_array.findIndex((image) => image.uuid === uuid);
      if (imageIndex !== -1) {
        state.image_array[imageIndex] = { ...state.image_array[imageIndex], ...updates };
      }
    },
  },
});

// Action creators are generated for each case reducer function
// Fixed: Export the correct action creators that match the reducers
export const { addImage, removeImage, changeImageKey, updateImage } =
  mesmerizingCarouselSlice.actions;

export default mesmerizingCarouselSlice.reducer;
