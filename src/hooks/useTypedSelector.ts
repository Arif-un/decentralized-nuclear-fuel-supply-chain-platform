import type { TypedUseSelectorHook } from 'react-redux'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from 'react-redux'

import type { RootState } from '@/global-states/store'

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export default useTypedSelector
