import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { RootState } from "./reducers"
import { AppDispatch } from "./store"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector