import { createSlice } from '@reduxjs/toolkit'

const tabs = createSlice({
    name: 'tabs',
    initialState: {
        value: [
            { id: 5, name: 'cylinder', link: 'cylinder' },
            { id: 6, name: 'leaflet', link: 'leaflet' },
            { id: 0, name: 'donut', link: 'donut' },
            { id: 1, name: 'visual', link: 'visual' },
            { id: 2, name: 'scenes', link: 'scenes' }, 
            { id: 3, name: 'snails', link: 'snails' },
            { id: 4, name: 'archi', link: 'archi' },
            
        ]
    },
    reducers: {
        addTab: (state, action) => {
            state.value.push(action.payload)
        }
    }
})

export const { addTab } = tabs.actions
export default tabs.reducer