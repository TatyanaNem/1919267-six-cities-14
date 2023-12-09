import { FormEvent, ChangeEvent, Fragment, useState } from 'react';
import { MIN_COMMENT_LENGTH } from '../../const';
import { Offer } from '../../types/offer';
import { useAppDispatch } from '../../hooks';
import { checkReviewValidation } from '../../utils/common';
import { sendReview } from '../../store/api-actions';

const ratingMap = {
  5: 'excellent',
  4: 'good',
  3: 'not bad',
  2: 'bad',
  1: 'terrible'
};

type ReviewFormProps = {
  id: Offer['id'] | undefined;
}

function ReviewForm ({id}: ReviewFormProps): JSX.Element {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useAppDispatch();

  function ratingChangeHandler (evt: ChangeEvent<HTMLInputElement>) {
    setRating(Number(evt.target.value));
  }

  function textareaChangeHandler (evt: ChangeEvent<HTMLTextAreaElement>) {
    setComment(evt.target.value);
  }

  function formSubmitHandler (evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    dispatch(sendReview({comment, rating, id}));
    setComment('');
    setRating(0);
  }

  const isSubmitDisabled = checkReviewValidation(comment, rating);

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={formSubmitHandler}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(ratingMap)
          .reverse()
          .map(([score, title]) => (
            <Fragment key={score}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={score}
                id={`${score}-stars`}
                type="radio"
                checked={rating === Number(score)}
                onChange={ratingChangeHandler}
              />
              <label htmlFor={`${score}-stars`} className="reviews__rating-label form__rating-label" title={title}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={textareaChangeHandler}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
