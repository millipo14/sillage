import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, fetchOrderUser, updateOrderStatus } from '../../../../features/orderSlice';
import s from './UserInfo.module.scss';

export default function UserInfo({ user, onClose }) {
  const dispatch = useDispatch()
  const orders = user.orders || []
  const [expandedOrder, setExpandedOrder] = useState(null)
  const categoryPref = user.categoryPreferences || []
  const notePref = user.preferred_note || []
  if (!user) return null

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await dispatch(updateOrderStatus({ orderId, status: newStatus }))
    } catch (e) {
      console.error('Ошибка:', e);
    }
  }

  const handleDeleteOrder = async (orderId) => {
    const confirmed = window.confirm('Удалить заказ?');

    if (!confirmed) return;
    try {
      await dispatch(deleteOrder(orderId))
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <button className={s.close} onClick={onClose}>×</button>

        <div className={s.header}>
          <div>
            <h2 className={s.name}>{user.first_name} {user.last_name}</h2>
            <p className={s.email}>{user.email}</p>
          </div>
          <div className={s.badge}>
            {user.subscription_status === 'active' ? 'Активная подписка' : 'Без подписки'}
          </div>
        </div>

        <div className={s.infoGrid}>
          <div className={s.infoItem}><span>Телефон</span><strong>{user.phone || '—'}</strong></div>
          <div className={s.infoItem}><span>Регистрация</span><strong>{new Date(user.created_at).toLocaleDateString()}</strong></div>
          <div className={s.infoItem}><span>Заказов</span><strong>{orders?.length || 0}</strong></div>
          <div className={s.infoItem}><span>Потрачено</span><strong>{orders?.reduce((acc, o) => acc + Number(o.total_amount), 0).toLocaleString()} ₽</strong></div>
        </div>

        <div className={s.section}>
          <h3 className={s.sectionTitle}>Предпочтения клиента</h3>
          <div className={s.preferencesContainer}>

            <div className={s.prefBlock}>
              <span className={s.prefBlockTitle}>Любимые категории:</span>
              <div className={s.tags}>
                {categoryPref.length > 0 ? (
                  categoryPref.map((cat, index) => (
                    <span key={index} className={`${s.tag} ${s.tagCategory}`}>{cat.category_name}</span>
                  ))
                ) : (
                  <span className={s.emptyText}>Не указано</span>
                )}
              </div>
            </div>

            <div className={s.prefBlock}>
              <span className={s.prefBlockTitle}>Предпочитаемые ноты:</span>
              <div className={s.tags}>
                {notePref.length > 0 ? (
                  notePref.map((note, index) => (
                    <span key={index} className={`${s.tag} ${s.tagNote}`}>{note.note_name}</span>
                  ))
                ) : (
                  <span className={s.emptyText}>Не указано</span>
                )}
              </div>
            </div>

          </div>
        </div>

        <div className={s.section}>
          <h3 className={s.sectionTitle}>История заказов</h3>
          <div className={s.orders}>
            {orders?.map(order => {
              const isExpanded = expandedOrder === order.order_id;
              return (
                <div
                  key={order.order_id}
                  className={`${s.order} ${isExpanded ? s.expanded : ''}`}
                  onClick={() => setExpandedOrder(isExpanded ? null : order.order_id)}
                >
                  <div className={s.orderMain}>
                    <div className={s.orderLeft}>
                      <span className={s.orderDate}>
                        Заказ №{order.order_id} {isExpanded ? '▲' : '▼'}
                      </span>
                      <p className={s.orderSub}>{new Date(order.order_date).toLocaleDateString()}</p>
                    </div>

                    <div className={s.orderRight} onClick={e => e.stopPropagation()}>
                      <select
                        className={s.select}
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                      >
                        <option value="pending">В обработке</option>
                        <option value="shipped">Отправлен</option>
                        <option value="delivered">Доставлен</option>
                        <option value="cancelled">Отменен</option>
                      </select>
                      <strong className={s.orderPrice}>{Number(order.total_amount).toLocaleString()} ₽</strong>
                    </div>
                    <button
                      className={s.deleteBtn}
                      onClick={() => handleDeleteOrder(order.order_id)}
                    >
                      Удалить
                    </button>
                  </div>

                  {isExpanded && (
                    <div className={s.details}>
                      <div className={s.detailsTitle}>Состав заказа:</div>
                      {order.items?.length > 0 ? order.items.map((item, idx) => (
                        <div key={idx} className={s.itemRow}>
                          <span>{item.perfume?.name || `Товар #${item.perfume_id}`}</span>
                          <span>{item.quantity} шт. - {item.volume} мл - {Number(item.price_at_purchase).toLocaleString()} ₽</span>
                        </div>
                      )) : <div className={s.emptyDetails}>Нет данных о товарах</div>}

                      {order.shipping_address && (
                        <div className={s.address}><strong>Адрес:</strong> {order.shipping_address}</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}