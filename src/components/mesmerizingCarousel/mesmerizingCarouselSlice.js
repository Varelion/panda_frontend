import { createSlice } from '@reduxjs/toolkit';

export const mesmerizingCarouselSlice = createSlice({
  //   { src: './assets/panda-pink.webp', alt: 'Panda Pink Special' },
  //   { src: './assets/panda-arm.webp', alt: 'Panda Arm Dish' },
  //   { src: './assets/panda-blue.webp', alt: 'Panda Blue Delight' },
  //   { src: './assets/panda-hooters.webp', alt: 'Panda Hooters Style' },
  //   { src: './assets/panda-poster.webp', alt: 'Panda Poster' },
  //   { src: './assets/panda-red.webp', alt: 'Panda Red Creation' },
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
      state.image_array.filter((value) => value != action.payload);
    },
    // TODO: Implement change where uuid matches
    // changeImageKey: (state, action) => {
      // state.;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = mesmerizingCarouselSlice.actions;

export default mesmerizingCarouselSlice.reducer;
