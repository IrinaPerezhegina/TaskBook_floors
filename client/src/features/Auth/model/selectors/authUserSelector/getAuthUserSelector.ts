// useEffect(() => {
//     if (!inited) {
//         dispatch(initAuthData());
//     }
// }, [dispatch, inited]);
import { StateSchema } from "../../../../../app/types/StateSchema";

export const getAuthUser = (state: StateSchema) => state.auth.user;
