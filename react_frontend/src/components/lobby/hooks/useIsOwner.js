import { useState, useEffect } from 'react';

export function useIsOwner(user,ownerPk) {
  return user.pk == ownerPk;
}