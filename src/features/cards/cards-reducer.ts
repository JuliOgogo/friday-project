import {cardsAPI, CreateCardType, UpdateCardValuesType} from './cards-api'
import {AppThunkType} from "../../app/store";
import {AxiosError} from "axios";
import {errorUtils} from "../../common/utils/error-utils";

const initialState: CardsStateType = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 30,
    minGrade: 5,
    page: 1,
    pageCount: 5,
    packUserId: '',
}

export const cardsReducer = (
    state: InitialStateType = initialState,
    action: CardsActionsType
): InitialStateType => {
    switch (action.type) {
        case cards_SET_CARDS:
            return  {
                ...action.cards,
                cards: action.cards.cards.map(
                    ({  updated, question,answer,grade, }) => ({
                        answer,
                        question,
                        grade,
                        updated: new Date(updated).toLocaleDateString(),

                    })
                ),
            }
        //     ({ _id, user_id, cardsPack_id, updated, question,answer,grade,shots,created }) => ({
        //     answer,
        //     question,
        //     cardsPack_id,
        //     grade,
        //     shots,
        //     user_id,
        //     _id,
        //     updated: new Date(updated).toLocaleDateString(),
        //     created: new Date(created).toLocaleDateString(),
        // })
        // case cards_ADD_CARD:
        //   return { ...state, cards:  }
        default:
            return state
    }
}

// actions
export const setCardsAC = (cards: CardsStateType) => ({ type: cards_SET_CARDS, cards } as const)
export const addCardAC = (card: CreateCardType) =>
    ({
        type: cards_ADD_CARD,
        card,
    } as const)
export const removeCardAC = (packId: string, cardId: string) =>
    ({ type: cards_REMOVE_CARD, cardId } as const)
export const updateCardAC = (values: UpdateCardValuesType) =>
    ({ type: cards_UPDATE_CARD, values } as const)

// thunks
//632416548a653a24cc005429 _id Valera -7 колод
export const fetchCardsTC=(cardsPacks_id:string): AppThunkType => async (dispatch, getState) =>{
    try {
        const res = await cardsAPI.getCards({cardsPack_id:cardsPacks_id})
        dispatch(setCardsAC(res.data))

    }catch (e){
        const err = e as Error | AxiosError

        errorUtils(err, dispatch)
    }

}

// types
export type InitialStateType = typeof initialState
export type CardsActionsType =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof addCardAC>
    | ReturnType<typeof removeCardAC>
    | ReturnType<typeof updateCardAC>

export type CardsStateType = {
    cards: CardStateType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
type CardStateType = {

    question: string
    answer: string
    grade: number


    updated: string
}

// constants
const cards_SET_CARDS = 'cards/SET_CARDS'
const cards_ADD_CARD = 'cards/ADD_CARD'
const cards_REMOVE_CARD = 'cards/REMOVE_CARD'
const cards_UPDATE_CARD = 'cards/UPDATE_CARD'