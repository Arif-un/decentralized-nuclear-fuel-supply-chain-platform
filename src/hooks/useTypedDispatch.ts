// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch } from 'react-redux'

import type { TypedDispatch } from '@/global-states/store'

const useTypedDispatch: () => TypedDispatch = useDispatch
export default useTypedDispatch
